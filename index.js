const express=require('express');
const Product=require('./model/listing')

const mongoose=require('mongoose');
const methodOverride=require('method-override')
const path=require ('path');
const ejsMate=require ('ejs-mate');

const app=express();
const PORT=3000;

const URL='mongodb://127.0.0.1:27017/product'
main().then(()=>{
    console.log("connection success");

}).catch((e)=>{
    console.log(e);

})

async function main(){
    await mongoose.connect(URL);

}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')));
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended:true}))



app.use(methodOverride('_method'));

app.get('/',async(req,res)=>{

    try {
        let listings= await Product.find({});
        res.render('index.ejs',{listings})



        
    } catch (error) {
        res.render("somthing went wrong")
        
    }
   
})

app.get('/listing/new',(req,res)=>{
    res.render('new.ejs')
})
app.post('/listing/new', async (req, res) => {
    const { name, image, price, quality } = req.body;

    try {
        const newProduct = new Product({
            name,
            image,
            price,
            quality,
        });
        await newProduct.save();
        res.redirect('/');
    } catch (error) {
        res.send("Error adding product to the database.");
    }
});
app.get('/listing/total', async (req, res) => {
    try {
        const products = await Product.find({});
        let totalValue = 0;

        for (let product of products) {
                    totalValue += product.price;
        }
        res.render('total', { totalValue });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT,()=>{
    console.log(`app is listen on port ${PORT}`);
})
