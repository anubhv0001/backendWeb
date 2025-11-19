const express=require('express');
const app=express();

app.get('/home',(req,res)=>{
    res.send(200).send('<h1>Welcome to Home Page</h1>')
})

app.get('/aboutus', (req, res) => {
  res.status(200).json({
    message: "Welcome to About Us"
  });
});


app.get('/contactus', (req, res) => {
  res.status(200).json({
    email: "contact@example.com",
    phone: "+1-234-567-890",
    address: "123 Express Street, Node City"
  });
});


app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});