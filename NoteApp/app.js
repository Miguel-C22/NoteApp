
class NoteApp{
    constructor(){

        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.inputs = document.getElementById('inputs')
        this.note = document.getElementById('note')
        this.title = document.getElementById('title')
        this.formBtns = document.getElementById('formBtns')
        this.displayNotes = document.getElementById('displayNotes')
        this.h2 = document.querySelector('h2')
        this.modal = document.getElementById('modal')

        this.render()
        console.log(this.notes.length)
        
    }
    eventListeners(){
        document.querySelector('body').addEventListener('click', event => {
             this.openForm(event)
             this.deleteNote(event)
             this.openModal(event)
             this.closeModal(event)
             this.editNote(event)
         })
     }
     
     openForm(event){
         if(event.target.matches("#note")){
             this.title.style.display="block"
             this.formBtns.style.display="block" 
             this.inputs.classList.add("openForm")
            
         }
     }
     
     closeForm(){
         document.getElementById('closeFormBtn').addEventListener('click', event =>{
            event.preventDefault()// prevents from from reloading the page after closing the from

            this.title.style.display="none"
            this.formBtns.style.display="none"

            //Clears Inputs
            this.title.value = ""
            this.note.value = ""
         })
     }
     
     addNote(){
         document.getElementById('submitFormBtn').addEventListener('click', event =>{
            event.preventDefault()// prevents from from reloading the page after submitting the from
            
            //New note Object 
            let newNote = {
               title: this.title.value,
               note: this.note.value,
               id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
            }

            if(newNote.title.length > 0 && newNote.note.length > 0){
                 //Adding new note into local storage
            console.log(newNote)
            this.notes = [...this.notes, newNote];
            this.saveNotes() 

            //add to html
            this.displayNote()

            //Clears Inputs
            this.title.value = ""
            this.note.value = ""
            }
            else{
                window.alert("All inputs must be filled in before creating note")
            }
         })
     }

     displayNote(){

        if(this.notes.length > 0 ){
            this.h2.style.display = "none"
        }else{
            this.h2.style.display = "block"
        }
    //&nbsp; Adds Spacing
    //data-id is for using dataset as it was used in the deleteNote Function
       return  this.displayNotes.innerHTML = this.notes.map(
         notes => `
            <div data-id="${notes.id}" class="noteContainer" 
            data-title="${notes.title}" 
            data-note="${notes.note}">
                <p class="title">${notes.title}</p> 
                <br> 
                <p class="note">${notes.note}</p> 
                <button class="deleteBtn" data-id="${notes.id}">Delete</button>
             </div>
             `
             ) 
      .join("");

     }
     deleteNote(event){
        // If id does not match then it will return from this function
        if(!event.target.matches('.deleteBtn')) return
        event.preventDefault()// prevents from from reloading the page after closing the from
            //grabbing the data-id
            const id = event.target.dataset.id;

            //filtering the nots array and displatys every note besides the ID that matched when clicked
            this.notes = this.notes.filter(note => note.id !== Number(id));

            this.displayNote() 
            this.saveNotes()
            console.log(event.target.dataset)
         }
        
    openModal(event){
        if(!event.target.matches('.noteContainer')) return
        event.preventDefault()// prevents from from reloading the page after closing the from
        

        //grabbing the data-id
        const title = event.target.dataset.title;
        const note = event.target.dataset.note;
        const id = event.target.dataset.id;

        //filtering the nots array and displatys every note besides the ID that matched when clicked
        this.modal.style.display = 'block'
        this.modal.innerHTML =
            `
            <textarea class="modalTitle" id="newTitle"type="text">${title}</textarea>   
            <textarea class="modalNote" id="newNote" type="text">${note}</textarea>   
            <button id="closeModalBtn">Close</button>
            <button id="save">Save</button>
            `

            document.getElementById('save').addEventListener('click', event => {

                //Updating Title
                let editedTitle = document.getElementById('newTitle').value;
                const newT = title
                let newTitle = this.notes.find((car) => car.title === newT);
                newTitle.title = editedTitle

                //Updating Note
                let editedNotes = document.getElementById('newNote').value;
                const newN = note
                let newNote = this.notes.find((car) => car.note === newN);
                newNote.note = editedNotes

                this.modal.style.display = 'none'

                this.displayNote() 
                this.saveNotes()

                return newTitle, newNote
            })
    }
     
    closeModal(event){
        document.getElementById('closeModalBtn').addEventListener('click', event => {
            this.modal.style.display = 'none'
        })
    }

     saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes))
      }

    editNote(event){
        if(!event.target.matches('.noteContainer')) return
    }
     
     
    render(){
        this.displayNote()
        this.eventListeners()
        this.closeForm()
        this.addNote()
     }
    
}
new NoteApp()





























