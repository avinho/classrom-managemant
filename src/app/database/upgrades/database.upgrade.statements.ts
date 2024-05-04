export class DataBaseUpgradeStatements {
  dabaseUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS Book (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS Lesson (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        book_id INTEGER,
        FOREIGN KEY (book_id) REFERENCES Book(id)
        );`,
        `CREATE TABLE IF NOT EXISTS Topic (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        lesson_id INTEGER,
        FOREIGN KEY (lesson_id) REFERENCES Lesson(id)
        );`,
        `CREATE TABLE IF NOT EXISTS StudentLesson (
        student_id INTEGER NOT NULL REFERENCES Student(id),
        lesson_id INTEGER NOT NULL REFERENCES Lesson(id),
        done INTEGER DEFAULT 0 NOT NULL,
        conclusion TEXT,
        PRIMARY KEY (student_id, lesson_id)
        );`,
        `CREATE TABLE IF NOT EXISTS StudentTopic (
        student_id INTEGER NOT NULL REFERENCES Student(id),
        topic_id INTEGER NOT NULL REFERENCES Topic(id),
        done INTEGER DEFAULT 0 NOT NULL,
        conclusion TEXT,
        PRIMARY KEY (student_id, topic_id)
        );`,
        `CREATE TABLE IF NOT EXISTS Student (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        birthdate TEXT NOT NULL,
        class_id INTEGER,
        current_book_id INTEGER,
        FOREIGN KEY (class_id) REFERENCES Class(id),
        FOREIGN KEY (current_book_id) REFERENCES Book(id)
        );`,
        `CREATE TABLE IF NOT EXISTS Class (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
        );`,
      ],
    },
    {
      toVersion: 2,
      statements: [
        `INSERT INTO Book (name) VALUES ('Essentials 1');`,
        `INSERT INTO Book (name) VALUES ('Essentials 2');`,
        `INSERT INTO Book (name) VALUES ('Transitions 1');`,
        `INSERT INTO Book (name) VALUES ('Transitions 2');`,
        `INSERT INTO Book (name) VALUES ('Fluency 1');`,
        `INSERT INTO Book (name) VALUES ('Fluency 2');`,
        `INSERT INTO Book (name) VALUES ('In Focus');`,
        `INSERT INTO Book (name) VALUES ('Teens Elementary 1');`,
        `INSERT INTO Book (name) VALUES ('Teens Elementary 2');`,
        `INSERT INTO Book (name) VALUES ('Teens Pre-intermediate');`,
        `INSERT INTO Book (name) VALUES ('Teens Intermediate');`,
        `INSERT INTO Book (name) VALUES ('Teens Upper-intermediate');`,
        `INSERT INTO Book (name) VALUES ('Teens Advanced');`,
        `INSERT INTO Book (name) VALUES ('Teens Higher 1');`,
        `INSERT INTO Book (name) VALUES ('Teens Higher 2');`,
        `INSERT INTO Class (name) VALUES ('Class 1');`,
        `INSERT INTO Class (name) VALUES ('Class 2');`,
        `INSERT INTO Class (name) VALUES ('Class 3');`,
        `INSERT INTO Class (name) VALUES ('Class 4');`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('John Doe', '01/01/1990', 1, 1);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Ana Silva', '18/06/2001', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('João Oliveira', '16/06/2004', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Maria Santos', '12/02/2008', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Pedro Lima', '03/01/2000', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Luana Costa', '01/02/1998', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Rafaela Oliveira', '03/03/2000', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Mariana Ferreira', '07/12/2002', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Gabriel Silva', '01/01/2000', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Lucas Oliveira', '11/11/1997', 1, NULL);`,
        `INSERT INTO Student (name, birthdate, class_id, current_book_id) VALUES ('Isabella Santos', '06/11/1999', 1, NULL);`,
      ],
    },
  ];
}
