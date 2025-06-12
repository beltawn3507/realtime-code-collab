import {v4 as uuidv4 } from "uuid"

const initalCode=
`   function sayHi(){
      console.log("Hello World");
    }
      
    sayHi();
`
export const initialFileStructure={
    name:"root",
    id:uuidv4(),
    type:"directory",
    children:[{
        id:uuidv4(),
        name:"index.js",
        type:"file",
        content:initalCode
    }
    ]
}

//recursive function which will return the directory which matches with the provided parent directory
export const findparentdirectory=(directory,parentdirectoryid)=>{
    //base case
   if(directory.id===parentdirectoryid && directory.type==="directory"){
    return directory;
   }

   if(directory.type==="directory" && directory.children){
    //recursively iterate to its child as well
    for(const children of directory.children){
        const found=findparentdirectory(children,parentdirectoryid);
        if(found) return found;
    }
   }
   return null;
}

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











