export let json = [

	{
		type: "DiagramBox",
		text: "Friends of 10 ialah dua nombor yang apabila digabungkan akan menghasilkan jumlah 10",
		content: {
			nums: [8],
			pelengkap: 2,
			showAnswer: true
		},
	},
	{
		type: "DiagramBox",
		text: "Contoh 1, 9 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [9],
			pelengkap: 1,
			showAnswer: false
		},
	},
	{
		type: "DiagramBox",
		text: "9 perlukan 1 lagi untuk jadi 10.",
		content: {
			nums: [9],
			pelengkap: 1,
			showAnswer: true
		}
	},
	{
		type: "DiagramBox",
		text: "Contoh 2, 8 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [8],
			pelengkap: 2,
			showAnswer: false
		},
	},
	{
		type: "DiagramBox",
		text: "8 perlukan 2 lagi untuk jadi 10.",
		content: {
			nums: [8],
			pelengkap: 2,
			showAnswer: true
		}
	},
	{
		type: "DiagramBox",
		text: "Contoh 3, 7 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [7],
			pelengkap: 3,
			showAnswer: false
		}
	},
	{
		type: "DiagramBox",
		text: "7 perlukan 3 lagi untuk jadi 10",
		content: {
			nums: [7],
			pelengkap: 3,
			showAnswer: true
		}
	},
	{
		type: "DiagramBox",
		text: "Contoh 4, 5 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [5],
			pelengkap: 5,
			showAnswer: false
		}
	},
	{
		type: "DiagramBox",
		text: "5 perlukan 5 lagi untuk jadi 10.",
		content: {
			nums: [5],
			pelengkap: 5,
			showAnswer: true
		}
	},
	{
		type: "DiagramBox",
		text: "Contoh 5, 9 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [9],
			pelengkap: 1,
			showAnswer: false
		}
	},
	{
		type: "DiagramBox",
		text: "9 perlukan 1 lagi untuk jadi 10.",
		content: {
			nums: [9],
			pelengkap: 1,
			showAnswer: true
		}
	},
	{
		type: "DiagramBox",
		text: "Contoh 6, 10 perlukan berapa lagi untuk jadi 10?",
		content: {
			nums: [10],
			pelengkap: 0,
			showAnswer: false
		}
	},
	{
		type: "DiagramBox",
		text: "10 perlukan 0 lagi untuk jadi 10.",
		content: {
			nums: [10],
			pelengkap: 0,
			showAnswer: true
		}
	},
	{
		text: "Padankan soalan dengan jawapan yang betul.",
		type: "Padankan",
		content: [
			{ question: "5 + 5", answer: 10},
			{ question: "4 + 6", answer: 10},
			{ question: "3 + 7", answer: 10},
			{ question: "8 + 2", answer: 10},
			{ question: "9 + 1", answer: 10},
		]
	},
	{
		text: "Padankan soalan dengan jawapan yang betul.",
		type: "MemoryGame",
		content: [
			{ question: "1 + 1", answer: 2 },
			{ question: "2 + 2", answer: 4 },
			{ question: "3 + 3", answer: 6 },
			{ question: "8 + 2", answer: 10 },
			{ question: "5 + 5", answer: 10 },
			{ question: "4 + 6", answer: 10 },
			{ question: "3 + 7", answer: 10 },
			{ question: "8 + 2", answer: 10 },
		]
	},

]