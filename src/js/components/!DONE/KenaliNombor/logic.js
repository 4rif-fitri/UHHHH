export function logicKenaliNombor(){
	
	let arrayClickCube = []
	let Count = 1
	
	let handleClickCube = e => {
		console.log(e.target);
		
		let dataIndex = e.target.dataset.index
		
		if (arrayClickCube.includes(dataIndex)) return
		
		arrayClickCube.push(dataIndex)
		
		let div = document.createElement("div")
		div.className = "count"
		let h4 = document.createElement("h4")
		h4.textContent = Count++
		div.appendChild(h4)
		
		e.target.appendChild(div)
		
		if (arrayClickCube.length >= 5) {
			setTimeout(() => {
				document.querySelectorAll(".count").forEach(count => count.remove())
				arrayClickCube = []
				Count = 1
			}, 3000)
		}
		
	}
	
	let cubes = document.querySelectorAll(".cube")
	cubes.forEach(cube => cube.addEventListener("click", handleClickCube))

}