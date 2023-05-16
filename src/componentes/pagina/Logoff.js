export const Logoff = () => {
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear()
        window.location.reload();
    });
}