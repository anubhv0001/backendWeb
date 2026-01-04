fetch('https://randomuser.me/api/?results=50')
.then((data)=>data.json())
console.log(data)
.catch((err)=>{
    console.log(err);
})
