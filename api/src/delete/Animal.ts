class Animal{
    private noOfLegs:number
    private noOfEye:number
    public setLegs(noOfLegs:number):void {
        this.noOfLegs=noOfLegs
    }
    setEye(noOfEye:number):Animal{
        this.noOfEye=noOfEye
        return new Cat()
    }
    abc():void;
    abc():void{
        
    }
    sound():void{console.log("I am animal")}
}
class Cat extends Animal{
    error:string
    public sound(): void {
        console.log("meoo")
    }
    setEye(noOfEye:number):Cat;
    setEye():void;
    setEye(noOfEye?:number):Cat|void{
        return new Cat()
    }
    
}
class Greeter {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  greet(person: string): void;
  greet(persons: string[],abc:number): void;
  greet(person: string|string[],abc?:number) {
    // if (typeof person === "string") {
    //   return `${this.message}, ${person}!`;
    // } else if (Array.isArray(person)) {
    //   return person.map((name) => `${this.message}, ${name}!`).join("\n");
    // }
    // return "";
  }
}
let cat:Animal=new Cat();
cat.sound()
