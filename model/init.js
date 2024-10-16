const Product=require('./listing')

const mongoose=require('mongoose');


const URL='mongodb://127.0.0.1:27017/product'
main().then(()=>{
    console.log("connection success");

}).catch((e)=>{
    console.log(e);

})

async function main(){
    await mongoose.connect(URL);

}


const vehicleData = [
    {
        name: "Tesla Model S",
        image: "https://cdn-www.pod-point.com/Tesla-model-s-2022.jpg?v=1664897114",
        price: 79999,
        quality: "Premium"
    },
    {
        name: "Ford Mustang GT",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 55000,
        quality: "High"
    },
    {
        name: "BMW X5",
        image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 62000,
        quality: "Luxury"
    }
];


  
  
  const Database = async () => {
    try {
        await Product.deleteMany({});
      
      await Product.insertMany(vehicleData);
      console.log(' successfully!');
  
      mongoose.connection.close();
    } catch (error) {
      console.log('Error in  the database:');
    }
  };
  
  
  Database();