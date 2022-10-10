export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <button className="sidebarButton" onClick={() => props.addNote()}> Add note</button>
            
            <button className="sidebarButton" onClick={() => props.logout()}> Logout</button>
            <h2 className="center">Sync: </h2>
            {props.isSynced 
            ? <span style={{color:'green'}} class="material-symbols-outlined center">done</span>
            : <div className="center"><span style={{color:'red'}} class="material-symbols-outlined loading">sync</span></div>
              }
        </div>)
}