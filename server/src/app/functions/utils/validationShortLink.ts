export function isValidShortLink(shortLink: string): boolean {
    if (!shortLink || typeof shortLink !== 'string') {
        return false;
    }

    // Verifica se o shortLink tem um tamanho válido (ex: entre 3 e 20 caracteres)
    if (shortLink.length < 3 || shortLink.length > 20) {
        return false;
    }

    // Verifica se contém apenas caracteres alfanuméricos, hífen e underscore
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validPattern.test(shortLink)) {
        return false;
    }

    // Verifica se não contém palavras reservadas ou inapropriadas
    const reservedWords = ['admin', 'api', 'auth', 'dashboard', 'login', 'register'];
    if (reservedWords.includes(shortLink.toLowerCase())) {
        return false;
    }

    return true;
}