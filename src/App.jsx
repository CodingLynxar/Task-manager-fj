import { useState } from 'react'
export default function App(){
const [task,setTask]=useState('')
const [tasks,setTasks]=useState([])
const addTask=()=>{
if(!task.trim()) return
setTasks([{id:Date.now(),text:task,done:false},...tasks])
setTask('')
}
const toggle=(id)=>setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t))
const del=(id)=>setTasks(tasks.filter(t=>t.id!==id))
return (
<div className='app'>
<div className='sidebar'>
<h2>TaskFlow</h2>
<p>Blue Black UI</p>
</div>
<div className='main'>
<h1>Task Manager</h1>
<div className='inputBox'>
<input value={task} onChange={(e)=>setTask(e.target.value)} placeholder='Enter task' onKeyDown={(e)=>e.key==='Enter'&&addTask()} />
<button onClick={addTask}>Add</button>
</div>
<div className='taskList'>
{tasks.map(t=>(<div className='task' key={t.id}><div className='left'><input type='checkbox' checked={t.done} onChange={()=>toggle(t.id)} /><span className={t.done?'done':''}>{t.text}</span></div><button className='deleteBtn' onClick={()=>del(t.id)}>Delete</button></div>))}
</div>
</div>
</div>)
}
