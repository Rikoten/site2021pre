let retryCount = 0

;(async function f() {
    const retry = () => {
        if (retryCount > 30) {
            throw 'Retried 30 times but failed'
        }
        setTimeout(() => {
            retryCount += 1
            console.log('retrying...')
            f()
        }, 300)
    }

    const imageWrapper = document.querySelector('.header .image-wrap')
    if (!imageWrapper) {
        throw '.header .image-wrap element not exists.'
    }

    const imagesJsonPrefetchLinkEl = Array
        .from(document.querySelectorAll('link[rel=prefetch]'))
        .filter(el => el.getAttribute('href')?.includes('header-images.json'))[0]
    if (!imagesJsonPrefetchLinkEl) {
        throw 'data/header-images not prefetched.'
    }

    const jsonPath = imagesJsonPrefetchLinkEl.getAttribute('href')
    const images = await fetch(jsonPath)
        .then(res => res.json())
        .catch(() => {
            retry()
        })

    const selfScriptEl = Array
        .from(document.getElementsByTagName('script'))
        .filter(el => el.src?.includes('header.js'))[0]
    if (!selfScriptEl) {
        throw 'Self <script> tag not found.'
    }

    const headerType = selfScriptEl.getAttribute('data-header-type')
    if (!selfScriptEl) {
        throw 'data-header-type attribute not specified in the script tag.'
    }
    if (!(['index', 'news', 'participants']).includes(headerType)) {
        throw 'Invalid value for data-header-type attribute. Value must be within `index`, `news` or `participants`.'
    }

    const imagesForCurrentPage = images.filter(it => it.place == headerType)

    const imagePathBase = selfScriptEl.getAttribute('data-image-path')
    if (!imagePathBase) {
        throw 'Specify data-image-path for <script>.'
    }

    for (const image of imagesForCurrentPage) {
        const path = imagePathBase + image.file
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = path
        document.head.appendChild(link)
    }

    const setImage = (image, nextImage = null) => {
        if (!image) {
            console.error('image undefined')
            return
        }

        imageWrapper.innerHTML = ''

        const imageElement = document.createElement('img')
        imageElement.classList.add('current')
        imageElement.src = imagePathBase + image.file
        imageWrapper.appendChild(imageElement)

        if (nextImage) {
            const nextImageElement = document.createElement('img')
            nextImageElement.classList.add('next')
            nextImageElement.src = imagePathBase + nextImage.file
            imageWrapper.appendChild(nextImageElement)
        }
    }

    setImage(imagesForCurrentPage[0], imagesForCurrentPage[1])

    let currentImage = 0
    setInterval(() => {
        currentImage += 1
        if (currentImage >= imagesForCurrentPage.length) {
            currentImage = 0
        }
        setImage(
            imagesForCurrentPage[currentImage],
            imagesForCurrentPage[currentImage + 1] ?? imagesForCurrentPage[0]
        )
    }, 6500)
})()
