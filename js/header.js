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

    const headerTypeEl = Array
        .from(document.getElementsByTagName('script'))
        .filter(el => el.src?.includes('header.js'))[0]
    if (!headerTypeEl) {
        throw 'Self <script> tag not found.'
    }

    const headerType = headerTypeEl.getAttribute('data-header-type')
    if (!headerTypeEl) {
        throw 'data-header-type attribute not specified in the script tag.'
    }
    if (!(['index', 'news', 'participants']).includes(headerType)) {
        throw 'Invalid value for data-header-type attribute. Value must be within `index`, `news` or `participants`.'
    }

    const imagesForCurrentPage = images.filter(it => it.place == headerType)

    const imagePathBase = document.querySelector('meta[data-name=header-image-path]')?.getAttribute('data-content')
    if (!imagePathBase) {
        throw '<meta data-name=header-image-path> must be exist.'
    }

    for (const image of imagesForCurrentPage) {
        const path = imagePathBase + image.file
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = path
        document.head.appendChild(link)
    }

    const setImage = (image) => {
        if (!image) {
            console.error('image undefined')
            return
        }
        const imageElement = document.createElement('img')
        imageElement.src = imagePathBase + image.file
        imageWrapper.innerHTML = ''
        if(image.position) imageElement.style.objectPosition = image.position;
        imageWrapper.appendChild(imageElement)
        document.querySelector(".header .group-name").textContent = image.name;
    }

    setImage(imagesForCurrentPage[0])

    if(imagesForCurrentPage.length > 1) {
        let currentImage = 0
        setInterval(() => {
            currentImage += 1
            if (currentImage >= imagesForCurrentPage.length) {
                currentImage = 0
            }
            setImage(imagesForCurrentPage[currentImage])
        }, 6000)
    }
})()
