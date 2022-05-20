const api = (personObj) => {
    return new Promise((resolve, reject) => {
        let randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        setTimeout(
            () => (personObj ? resolve({name : personObj.name, income: randomNumber}) : reject(new Error('an error occured while fetching salary details for ' + personObj))),
            randomNumber
        );
    });
}

export { api };