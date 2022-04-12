


    const container = document.querySelector(".container");
    const todo = document.querySelector(".to-do-content");
    const add = document.getElementById("add");
    const search = document.getElementById("search");
    const task = document.getElementById("task");

  
console.log(add);
    let notesObj = JSON.parse(localStorage.getItem("dave")) || [];
    
    if(JSON.parse(localStorage.getItem("dave")))
    {
        notesObj.map(e=>{
            render(e);
        })
    }

    function render(obj)
    {
        console.log(obj);
       const content=
       `<div class="wrapper">
            <p contentEditable="true">${obj.text}</p>
            <button type="button" data-id=${obj.id}>update</button>
            <button type="button">delete</button>
        </div>
        `

        todo.insertAdjacentHTML('beforeend',content);


        const wrap=document.querySelectorAll('.wrapper');
        wrap.forEach(el=>{

            const btnup=el.children[1];
            const btndel=el.children[2];

            btnup.addEventListener("click",e=>{
                console.log(el.children[0]);
                const txt=el.children[0].textContent;
                const id=el.children[1].getAttribute('data-id');
                update(id,txt);
            })

            btndel.addEventListener("click",e=>{

                const id=el.children[1].getAttribute('data-id');
                del(id,el);
            })
        })
    }
    
    function update(id,txt)
    {
        notesObj.filter(notes=>{
            if(notes.id=id)
               notes.text=txt;
            
            return notes;
        })
        localStorage.setItem("dave", JSON.stringify(notesObj));
    }

    function del(id,el)
    {
     
      notesObj=notesObj.filter(notes=>{
            if(notes.id!=id)
              return notes;
 })
       el.remove();
       console.log(notesObj); 
        localStorage.setItem("dave", JSON.stringify(notesObj));
   }


    function addto(text)
    {
        const obj={
            id:Math.floor(Math.random()*30000),
            text
        }

        render(obj);
        notesObj.push(obj);
        localStorage.setItem("dave", JSON.stringify(notesObj));

    }

    container.addEventListener('submit',e=>{
      e.preventDefault()
        const txt=task.value;
         console.log(txt);
         addto(txt); 
    })
    function searchtodo(txt)
    { 
        let child= todo.lastElementChild;
        while(child)
        {
            todo.removeChild(child);
            child =todo.lastElementChild;
        }
       notesObj.filter(e=>{
           if(e.text.includes(txt))
           {
               render(e);
           }
       })
    }
    search.addEventListener("click",e=>
    {
        const val=task.value;
        console.log(val)
        searchtodo(val);
    })
