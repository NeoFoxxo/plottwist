let arr = [
	"FluffyDuck",
	"SavageMonkey",
	"WeirdAplaca",
	"OverloadedLlama",
	"CurvedSpoon",
	"NormalBot",
	"PeppermintsTeacher",
	"DonnBubz",
	"LinuxTechDips",
	"TaskManager",
	"AuthorizedPoliceOfficer",
	"RubberDuck",
	"FluffyLion",
	"BigOctopus",
	"TinySpider",
	"RottenFlesh",
	"PickleMint",
	"PickleJar",
	"RandomNumber",
	"VarString",
	"RandomUsername",
	"JustUsername",
]

export async function generateRandomUsername(): Promise<string> {
	try {
		const response = await fetch(process.env.AI_API_URL + "/create-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${process.env.AI_API_KEY}`,
			},
		})
		const data_ = await response.json()
		const username = JSON.parse(data_.result.Output.generatedUsername).username
		return username
	} catch (err) {
		let username =
			arr[Math.floor(Math.random() * arr.length)] +
			Math.floor(Math.random() * 1000000)
		return username
	}
}
