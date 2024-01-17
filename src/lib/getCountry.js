export async function GetCountry(code) {

    return (await import(`./countries/${code}.json`)).default;

}