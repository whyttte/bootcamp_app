const { Pool } = require("pg");

console.log("\n***Start of my Code ***");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

// const query1 = "SELECT id, name FROM cohorts LIMIT 5";
// const query2 = "SELECT id, name, cohort_id FROM students LIMIT 5;";

// An object to save my stuff, if needed
const results = {};
//..............................................................................................................................
// pool
//   .query(`
//   SELECT id, name, cohort_id
//   FROM students
//   LIMIT 5;
//   `)
//   .then(res => {
//     console.log(res.rows);
//   })
//   .catch(err => console.log("query error:", err.stack));

// console.log("***End of my Code ***\n");
//................................................................................................................................
// pool
//   .query(`
//   SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
//   FROM students
//     JOIN cohorts ON cohort_id = cohorts.id
//   LIMIT 5;
//   `)
//   .then(res => {
//     res.rows.forEach (user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     })
//   })
//   .catch(err => console.log("query error:", err.stack));
  
  
// console.log("***End of my Code ***\n");

//.................................................................................................................................
// IF WE WANNA USE NODE AS INPUT
// pool
//   .query(`
//   SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
//   FROM students
//     JOIN cohorts ON cohort_id = cohorts.id
//   WHERE cohorts.name LIKE '%${process.argv[2]}%'
//   LIMIT ${process.argv[3] || 5};
//   `)
//   .then(res => {
//     res.rows.forEach (user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     })
//   })
//   .catch(err => console.log("query error:", err.stack));
  
  
// console.log("***End of my Code ***\n");

//........................................................................................................................................
// TO AVOID MALICIOUS ACTIONS< WE DO THIS INSTEAD

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)

.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));

console.log("***End of my Code ***\n");