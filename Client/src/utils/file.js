import {v4 as uuidv4 } from "uuid"

const initalCode=
`   function sayHi(){
      console.log("Hello World");
    }
      
    sayHi();
    // You can work together on code with live updates across all users
    // Write and run code in multiple programming languages
    // Sketch diagrams, brainstorm ideas, or plan visually in real time
    // Use ByteBot for code Generation
    // Share your unique room link with others to invite them
     `


const initalCodeCPP=
` #include <iostream> 
      using namespace std;  

      int main() { 
        std::cout << "Hello, World!" << std::endl; 
      return 0; 
}`

export const files=[{
        id:uuidv4(),
        name:"index.js",
        content:initalCode
    },
    {
        id:uuidv4(),
        name:"tut.cpp",
        content:initalCodeCPP
    }
];
    



//this function will check wether a file with same name already exists or not
export const doesfileexist=(directory,name)=>{
    if(!directory.children) return false;
    return directory.children.some((child)=>child.name===name)
}

//recursive function to find file by id .pass whole filestructure into the fucntion
export const getfilebyid=(fileStructure,fileId)=>{
    //recursive function
    const findfile=(directory)=>{
        if(directory.id===fileId) return directory
        else if(directory.children){
            for(const child of directory.children){
                const found=findfile(child);
                if(!found) return found;
            }
        }
    }
    return null;
}











