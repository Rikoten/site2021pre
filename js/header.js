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
    const images = await fetch(jsonPath).then(res => res.json())

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

    console.log(images)
    console.log(headerType)
})()
