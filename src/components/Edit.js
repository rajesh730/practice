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

const Edit = () => {

const [text, setText] = useState();//hook to get the text

const [store, setStore] = useState(getLocalStorage())//hook to store the text

const [toggle, setToggle] = useState(true)

const [editItem, setEditItem] = useState()


///////////////@@@@@@@@@@@@@@!!!!!!!!!!!!!!!------------------@@@@@@@@@@@@@@/!!!!!!!!!!!!????????

    const click=()=>{//store item from  {text to store} using hooks in arr------------onClick handler
       
        if (!text){
               alert("plz input data")
        }
        else if(text && !toggle){
             setStore(
                  store.map((ele)=>{
                      if(ele.id===editItem){
                          return{...ele,name:text    }
                      }
                      return ele;
                  })
             )
             setToggle(true);
             setText(null);
             setEditItem(null);;

        }
        else{
            const allInputData={id:new Date().getTime().toString(),name:text}//??difference from home
             setStore([...store,allInputData]);
            setText("")
        }
        
///////////////////////////////////----------on change handler-------------/////////////////
    }
    const change=(event)=>{
        setText(event.target.value);

    }

    ////@@@@@@@@@!!!!!!!!!!!!!!//delete item one by one///e////@@@@@@@@!!!!!!!!!!!!!
         
    const deleteItem=(index)=>{ 
        const updatestore=store.filter((ele)=>{
            return index !== ele.id;
        });
        setStore(updatestore);
    }

    /////////////////@@@@@!!!!!!!!!!   edit store!!!!!!!!!!/////////////

    const editStore=(id)=>{
        let newEditItems=store.find((ele)=>{
            return ele.id === id
        });
        console.log(newEditItems);
        //get correct store to textarea
        setToggle(false)
        setText(newEditItems.name)
        setEditItem(id)
        //update the correct store


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
                {
                    toggle?<button onClick={click}>+</button>:<button onClick={click} >edit</button>

                }
            </div >
            <div className="container">
            
            {
                store.map((ele)=>{    
                    return(
                    <>
                    <div className="container" key={ele.id}>
                        <h1>{ele.name}</h1>
                        <button onClick={()=>editStore(ele.id)}  >edit</button>
                        <button onClick={()=>deleteItem(ele.id)} >del</button>
                        <hr/>
                        </div>
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


export default Edit;
