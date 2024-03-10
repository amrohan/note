// src/db.ts
import Dexie from 'dexie';

export interface Note {
	id?: number;
	title: string;
	date: string;
	star: boolean;
	archived: boolean;
	isDeleted: boolean;
	content: string;
}

class NoteDb extends Dexie {
	notes!: Dexie.Table<
		{
			id?: number;
			title: string;
			date: string;
			star: boolean;
			archived: boolean;
			isDeleted: boolean;
			content: string;
		},
		number
	>;

	constructor() {
		super('notedb');
		this.version(1).stores({
			notes: '++id, title, date, star, archived, isDeleted, content'
		});
		// The 'notes' property is now definitely assigned

		// this.on('ready', () => {
		// 	this.notes.count().then((count) => {
		// 		if (count === 0) {
		// 			// Database is empty, populate with mock data
		// 			this.notes
		// 				.bulkAdd([
		// 					{
		// 						title: 'First Note',
		// 						date: '24 Jan 2024',
		// 						star: false,
		// 						archived: false,
		// 						isDeleted: false,
		// 						content: 'This is my first note.'
		// 					},
		// 					{
		// 						title: 'Second Note',
		// 						date: '25 Jan 2024',
		// 						star: true,
		// 						archived: false,
		// 						isDeleted: false,
		// 						content: 'This is my second note.'
		// 					}
		// 					// Add more notes as needed
		// 				])
		// 				.then(() => {
		// 					console.log('Database populated with mock data');
		// 				});
		// 		} else {
		// 			console.log('Database already populated');
		// 		}
		// 	});
		// });
	}
}

// Export an instance of the database
export const db = new NoteDb();
