document.querySelector('#addItem').addEventListener('click', () => {
    
    const li= document.createElement('li');
    const trash=document.createElement('button')
    trash.innerHTML ="🗑️"
    trash.addEventListener('click',()=>{
        li.remove();
    })
    li.innerText=document.querySelector('.listItem').value;
    li.appendChild(trash)
    document.querySelector('#checkList-container').appendChild(li);

    });
