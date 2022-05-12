const person = {
    name: {
        last: "Essantouh",
        first: "Rachid",
    },
    age: 28,
    gender: "male",
    interests: ["DIY", "dancing"],

    bio: function () {
        console.log(this.name[0] + " " + this.name[1] + " is " + this.age + " years old. He likes " + this.interests)
    },

    greeting: function () {
        console.log("Hi! My name is " + this.name["first"] + ".")
    }
}

let height = "height"
let heightInCm = "1,80cm"

person[height] = heightInCm


console.log(person.name.first)
console.log(person.name.last)
console.log(person.age)
console.log(person.height)
console.log(person.interests[1])
person.bio()
person.greeting()