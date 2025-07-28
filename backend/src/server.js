import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/auth/signup',(req,res)=>{
    res.send('Hello World');
})
app.get('/api/auth/login',(req,res)=>{
    res.send('Hello World');
})
app.get('/api/auth/logout',(req,res)=>{
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});