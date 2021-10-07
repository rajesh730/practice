import React,{useState,useEffect} from 'react'


////////////???????????--------GET DATA FROM LOCAL SSTORAGE------?????????///
const getLocalStorage=()=>{
    let list=localStorage.getItem('local_memory');
    if(list){
        return  JSON.parse(localStorage.getItem('local_memory'));//////convert local storage into array
    
    }else{
        return [];
    }
}



//////////////////-------MAIN FNCTION STARTED------/////////

const Home = () => {

const [text, setText] = useState();
// const [store, setStore] = useState([])---//before local storage used
const [store, setStore] = useState(getLocalStorage())//----afteer local storage is used


///////////////@@@@@@@@@@@@@@!!!!!!!!!!!!!!!------------------@@@@@@@@@@@@@@/!!!!!!!!!!!!????????

    const click=()=>{//store item from  {text to store} using hooks in arr
       
        if (!text){
  
        }else{
             setStore([...store,text]);
            setText("")
        }
        
///////////////////////////////////----------on change handler-------------/////////////////
    }
    const change=(event)=>{
        setText(event.target.value);

    }

    ////@@@@@@@@@!!!!!!!!!!!!!!//delete item one by one///////@@@@@@@@!!!!!!!!!!!!!
         
    const deletestore=(id)=>{ 
        const updatestore=store.filter((ele,ind)=>{
            return ind !== id;
        });
        setStore(updatestore);
    }
/////////////////@@@@@!!!!!!!!!!   helps to delete stored aiem at once!!!!!!!!!!/////////////
     //delete all
     const remove_all=()=>{     
            setStore([]) 
     }




     ////////////////////@@@@@@@---------ADD DATA TO LOCAL STORAG-----?????????>???????//////


   useEffect(() => {
       localStorage.setItem('local_memory',JSON.stringify(store))
      
   }, [store])

     ///////////////@@@@@@@@@@ ---------------JSX START---------@@@@@@@@@!!!!!!!!!!/////////////









     
    
    return (
        <>
            <div className="container my-4 mb-3">
               <h1> To Do App for beginner</h1>
            </div>

            <div className="container">
                <input type="text"  value={text} onChange={change} placeholder="input items" />
                <button onClick={click}>+</button>
            </div >
            <div className="container">
            
            {
                store.map((ele,ind)=>{
                    return(
                    <>
                        <h1>{ele}</h1>
                        
                        <button onClick={()=>deletestore(ind)} >del</button>
                        <hr/>
                        </>
                    );
                    

                })
            }


            </div>
            <div className="container my-4">
            <button onClick={remove_all} >remove all</button>

            </div>
        </>
    )

}


export default Home;
