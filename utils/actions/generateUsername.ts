let arr = [
    'FluffyDuck',
    'SavageMonkey',
    'WeirdAplaca',
    'OverloadedLlama',
    'CurvedSpoon',
    'NormalBot',
    'PeppermintsTeacher',
    'DonnBubz',
    'LinuxTechDips',
    'TaskManager',
    'AuthorizedPoliceOfficer',
    'RubberDuck',
    'FluffyLion',
    'BigOctopus',
    'TinySpider',
    'RottenFlesh',
    'PickleMint',
    'PickleJar',
    'RandomNumber',
    'VarString',
    'RandomUsername',
    'JustUsername'
]

export async function generateRandomUsername() {
    try {
        const response = await fetch('https://cluyaim7y39pv7mvbkmxlhcbh.agent.a.smyth.ai/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        const data_ = await response.json();
        const username = JSON.parse(data_.result.Output.generatedUsername).username
        return username
    } catch (err) {
        let username = arr[Math.floor(Math.random() * arr.length)] + Math.floor(Math.random() * 100)
        return username
    }
}
