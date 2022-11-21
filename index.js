import fs from 'fs';
import yargs from 'yargs';




// const file = yargs(process.argv.slice(2)).argv;
//We can also use like this
import {hideBin} from 'yargs/helpers';
const fileName = yargs(hideBin(process.argv)).argv;


/*******************Quick Notes about hideBin************************ */
// Note: hideBin is a shorthand for process.argv.slice(2). It has the benefit that it takes into account variations in some environments

console.log(fileName._[0]); //To log the user input( the 3rd params)

//a separate Text file that contains array
const arr = [fileName._[0]];

// fs.writeFile("filelists.txt", [])
fs.readFile("fileLists.txt", (err, data)=> {
  if(err) {
       fs.writeFile("fileLists.txt", fileName._[0] , (err, data)=>{
            if(err) throw err;
              fs.writeFile(fileName._[0], 'You are awesome' ,(err, data)=>{
                  if(!err) {
                      console.log("File created Successfully")
                  }
              })
          })
     } else {
         fs.readFile("fileLists.txt",'utf-8',(err, data)=> {
              if(err) {
                 console.log("err")
              } else {
                   const arr = data.split(/\r?\n/);
                   const res = arr.includes(fileName._[0]);

                    if(res) {
                        console.log("File Already Exits, Please Choose Another Name")
                    } else {
                        fs.appendFile("fileLists.txt", '\n'+fileName._[0], (err, data)=> {
                          if(err) {
                             console.log('err')
                          } else {
                             fs.writeFile(fileName._[0], "You are awesome", (err, data)=> {
                                 if(err) {
                                     console.log("Error")
                                 } else {
                                     console.log("File Written Successfully")
                                 }
                             })
                         }
                     })
                    }
              }
         })
     }
})
