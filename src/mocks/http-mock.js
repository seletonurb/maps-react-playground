export const mockHttp = (success, timeout) => {
    console.log('Making async call...')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve();
            } else {
                reject({ message: 'Error' });
            }
        }, timeout);
    });
}