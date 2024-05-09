

// showing loading
export function displayLoading(loader) {
    loader.classList.remove("hidden")
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.add("hidden")
    }, 10000)
}

// hiding loading 
export function hideLoading(loader) {
    loader.classList.add("hidden")
}