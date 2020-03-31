<?php

// GLOBAL FUNCTIONS

// Does string contain letters
function has_letter($string) {
    return preg_match( '/[a-zA-Z]/', $string );
}

// Does string contain numbers
function has_number($string) {
    return preg_match( '/\d/', $string );
}

// Does string contain special characters
function has_special_char($string) {
    return preg_match('/[^a-zA-Z\d]/', $string);
}

// Check if password contains number, 
// letter, special char, and length
function password_check($pass = '') {
	if(!has_number($pass) || !has_letter($pass) || !has_special_char($pass) || strlen($pass) < 8) { return false; }

	return true;
}

// Checks if number is formatted as N,2
function is_currency($number) {
  return preg_match("/^-?[0-9]+(?:\.[0-9]{2})?$/", $number);
}

// Iterate through array of keys/fields
// and return an array using the field names
// as keys
function post_fields_to_array_keys($arr) {
	$tmp = array();
	foreach ($required as $field) {
		if(isset($_POST[$field]) && !empty($_POST[$field])) {
			$tmp[$field] = $_POST[$field];
		}
	}
	return $tmp;
}

// ADMIN DASHBOARD FUNCTIONS

function restaurant_list($conn) {
	$query = $conn->prepare("SELECT * FROM restaurant, location WHERE res_id = loc_id");
	try {
		$query->execute();
		return $query->fetchAll();
	} catch (PDOException $e) {
		
	}
}

function restaurant_info($conn, $id) {
	$query = $conn->prepare("SELECT * FROM restaurant, location WHERE res_id = loc_id AND loc_id = :id");
	$query->bindParam(":id", $id);

	try {
		$query->execute();
		return $query->fetch();
	} catch(PDOException $e) {

	}
}

function restaurant_managers($conn, $id) {
	$query = $conn->prepare("SELECT * FROM employee WHERE fk_loc_id = :id AND emp_manager = 1");
	$query->bindParam(":id", $id, PDO::PARAM_INT);

	try {
		$query->execute();
		return $query->fetchAll();
	} catch(PDOException $e) {

	}
}

function restaurant_employees($conn, $id) {
	$query = $conn->prepare("SELECT * FROM employee WHERE fk_loc_id = :id AND emp_manager = 0");
	$query->bindParam(":id", $id, PDO::PARAM_INT);

	try {
		$query->execute();
		return $query->fetchAll();
	} catch(PDOException $e) {

	}	
}

function employee_list($conn) {
	$query = $conn->prepare("SELECT * FROM employee");

	try {
		$query->execute();
		return $query->fetchAll();
	} catch (PDOException $e) {
		
	}
}

function employee_info($conn, $id) {
	$query = $conn->prepare("
		SELECT emp_first_name, emp_last_name, emp_email, emp_username, emp_last_login, emp_created, emp_address_1, emp_address_2, emp_city, emp_state, emp_postal_code, emp_phone, emp_status, res_name, loc_id, loc_address_1, loc_address_2, loc_city, loc_state, loc_postal_code, loc_phone 
		FROM employee
		LEFT JOIN location ON
		loc_id = fk_loc_id
		LEFT JOIN restaurant ON
		res_id = fk_res_id 
		WHERE emp_id = :eid
		");
	$query->bindParam(":eid", $id, PDO::PARAM_INT);

	try {
		$query->execute();
		return $query->fetch();
	} catch (PDOException $e) {
		
	}
}

function menu_item_categories($conn, $id) {
	$lid = $id;
	$sql = "SELECT item_cat_id, item_cat_name, item_cat_description FROM menu_item_category WHERE fk_loc_id = :lid";
	$query = $conn->prepare($sql);
	$query->bindParam(":lid", $lid, PDO::PARAM_INT);
	if($query->execute()) {
		return $query->fetchAll();
	}
}

function menu_items($conn, $id) {
	$cid = $id;
	$sql = "SELECT item_id, item_name, item_description, item_price FROM menu_item WHERE fk_item_cat_id = :cid";
	$query = $conn->prepare($sql);
	$query->bindParam(":cid", $cid, PDO::PARAM_INT);
	if($query->execute()) {
		return $query->fetchAll();
	}
}
?>