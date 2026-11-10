--insert into medicine table 
"insert into medicines values (?,?,?,?,?);"
--available medicines 
"select (name,quantity) from medicines 
where status=available and expiry_date>curdate();"
--request a medicine 
