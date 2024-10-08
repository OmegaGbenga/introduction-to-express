import express from 'express';

const app = express();

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};


app.use(loggingMiddleware);

const PORT =3000;
const mockUsers=[
    {id:1, username:'Gbenga', displayName:'Dare'},
    {id:2, username:'Boluwatife', displayName:'Bolu'},
    {id:3, username:'Abolade', displayName:'Bola'},
    {id:4, username:'Ololade', displayName:'Lolade'},
    {id:5, username:'Olaide', displayName:'laide'},
    {id:6, username:'Toluwani', displayName:'Tunji'},
    {id:7, username:'Derin', displayName:'Aminu'},
    {id:8, username:'Tola', displayName:'Tola'},
];

app.get("/", (req,res)=>{
    res.status(201).send({msg:"Hello world"});
});

app.get("/api/users", (req, res)=>{
    console.log(req.query);
    const{
        query:{filter, value}
    }=req;
    //When filter and value are undefined😒😒😒
    if(!filter && !value) return res.send(mockUsers);

    if(filter && value) return res.send(mockUsers.filter(user=> user[filter].includes(value)));
    return res.send(mockUsers)
});

app.post("/api/users", (req,res)=>{
    console.log(req.body); 
    const{body}=req;
    const newUser = {id:mockUsers[mockUsers.length-1].id+1,...body};
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req,res)=>{  
    const parsedId=parseInt(req.params.id);
    if(isNaN(parsedId)){return res.status(400).send({msg:"Bad request.Invalid ID"})};  
    const findUser = mockUsers.find((user) => user.id===parsedId);
    if(!findUser) return res.status(404).send({msg:"User not Found"});
    return res.send(findUser);
});

app.get("/api/products", (req,res)=>{
    res.send([{ id: 123, name: "chicken breasts", price: 12.99}]);
});     



app.put("/api/users/:id", (req, res)=>{
    const{
        body,
        params:{id},
    }=req;
    const parsedId =parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex(
        (user)=>user.id===parsedId
    )
    if(findUserIndex===-1) return res.sendStatus(404);

    mockUsers[findUserIndex]={id:parsedId,...body};
    return res.sendStatus(200);
});

app.patch("/api/users/:id", (req, res)=>{
    const{
        body,
        params:{id},
    }=req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user)=> user.id ===parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    mockUsers[findUserIndex]= {...mockUsers[findUserIndex], ...body};
    return res.sendStatus(200);
});

app.delete("/api/users/:id", (req,res)=>{
    const {params:{id},
    }=req;

    const parsedId=parseInt(id);

    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) =>user.id === parsedId);
    if(findUserIndex===-1) return res.sendStatus(404);
    mockUsers.splice(findUserIndex,1);
    return res.sendStatus(200);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
});

//PUT
//PATCH
//DELETE