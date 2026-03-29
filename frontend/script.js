const API = "http://localhost:5000/api/notes";
  async function addNote(){
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const category = document.getElementById("category").value;
 
  await fetch(API, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ title, content, category })
  });

  loadNotes();
}

  async function loadNotes(){
  const res = await fetch(API);
  const data = await res.json();
document.getElementById("notes").innerHTML = data.map(n =>
  ` <div class="${n.pinned ? 'pinned' : ''}">
    <h3>${n.title}</h3>
    <p>${n.content}</p>

    <button onclick="deleteNote('${n._id}')">Delete</button>
    <button onclick="pinNote('${n._id}')">
    ${n.pinned ? "Unpin" : "Pin"}
    </button>
</div>`

).join("");
}
 async function deleteNote(id){
  await fetch(API + "/" + id, {method:"DELETE"});
  loadNotes();
}
async function pinNote(id){
  await fetch(API + "/pin/" + id, {
  method: "PUT"
  
});

  loadNotes();
}

function searchNotes(){
  const value = document.getElementById("search").value.toLowerCase();
  const notes = document.querySelectorAll("#notes div");
  notes.forEach(n=>{
  n.style.display = n.innerText.toLowerCase().includes(value)
  ? "block":"none";
  
});

}
loadNotes();