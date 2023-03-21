export const Logoff = () => {
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    });
}