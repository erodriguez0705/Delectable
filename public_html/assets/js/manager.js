$(document).ready(function() {
	$("#add-item-price").on("change", function() {
		$(this).val(parseFloat($(this).val()).toFixed(2));
	});

	$("#add-category-desc").keyup(function() {
		let v = $(this).val();
		let l = $(this).val().length;
		$(this).val($(this).val().substring(0, 255));
		if(l > 255) {
			$("#cat-text-counter").html(0);
		} else {
			$("#cat-text-counter").html(255 - l);
		}
	});

	$("#add-category-name").keyup(function() {
		let v = $(this).val();
		let l = $(this).val().length;
		$(this).val($(this).val().substring(0, 32));
		if(l > 255) {
			$("#cat-name-counter").html(0);
		} else {
			$("#cat-name-counter").html(32 - l);
		}
	});

	$("#add-category-btn").click(function() {
		let menu = $(".res-menu").html();
		let cat = $("#add-category-name").val();
		let desc = $("#add-category-desc").val();
		let sel = $("#add-item-category");
		
		$.ajax({
			url: '/delectable/public_html/assets/scripts/restaurant-menu.php',
			type: 'POST',
			data: {
				'add_menu_item_category': true,
				'cat_name': cat,
				'cat_desc': desc,
				'loc_id': lid
			}
		}).done(function(response) {
			let res = JSON.parse(response);
			if(!res.error) {
				cid = res.cat_id;
				let opt = "<option value='" + cid + "'>" + cat + "</option>";
				let cat_row = '<h1 class="h5 subheader-border mt-3 row mx-0">';
				cat_row += '<div class="col-9 pl-0">' + cat + '</div>';
				cat_row += '<div class="col-3 pr-0 text-right">';
				cat_row += '<small class="">';
				cat_row += '<button class="border-0 btn-link-alt table-link text-link px-0" value="' + cid + '">Edit</button> | ';
				cat_row += '<button class="border-0 btn-link-alt table-link text-link px-0" value="' + cid + '">Remove</a>';
				cat_row += '</small></div></h1>';
				cat_row += '<div class="word-break"><small><i>';
		        cat_row += desc;
		        cat_row += '</i></small></div>';
				$(".res-menu").append(cat_row);
				sel.append(opt);
				$(".add-item-alert").addClass("d-none");
				$(".add-cat-alert").removeClass("alert-danger");
				$(".add-cat-alert").addClass("alert-success");
				$(".add-cat-alert").html("Successfully added!");
				$(".add-cat-alert").removeClass("d-none");
				$("add-category-name").val("");
				$("add-category-desc").val("");
			} else {
				$(".add-item-alert").addClass("d-none");
				$(".add-cat-alert").removeClass("alert-success");
				$(".add-cat-alert").addClass("alert-danger");
				$(".add-cat-alert").html(res.error_msg);
				$(".add-cat-alert").removeClass("d-none");
			}
		});
	});

	$("#add-item-image").change(function() {
		let file = $(this).val();
		let name = this.files[0].name;
		if(name.length > 0) {
			$("#add-item-image-label").html(name);
		} else {
			$("#add-item-image-label").html("Choose image file");
		}
	});

	$('#create-emp-pay').on('change', function(){
    	$(this).val(parseFloat($(this).val()).toFixed(2));
	});

	$("#create-employee-account").on("click", function() {
		let fname  = $("#create-emp-first-name").val();
		let lname  = $("#create-emp-last-name").val();
		let uname  = $("#create-emp-username").val();
		let email  = $("#create-emp-email").val();
		let pass1  = $("#create-emp-password-1").val();
		let pass2  = $("#create-emp-password-2").val();
		let job    = $("#create-emp-job").val();
		let pay   = $("#create-emp-pay").val();
		let rate   = $("#create-emp-pay-rate").val();
		let access = ($("#create-emp-manager").prop("checked")) ? 1 : 0;
		let alert  = $(".create-emp-alert");
		let error  = false;
		let errMsg = "";
		let fields = ["#create-emp-first-name", "#create-emp-last-name", "#create-emp-username", "#create-emp-email", "#create-emp-password-1", "#create-emp-password-2"];

		// Fields cannot be left empty
		if(fname.length < 1 || lname.length < 1) {
			error = true;
			errMsg = "Name cannot be empty";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		if(email.length < 1) {
			error = true;
			errMsg = "Email cannot be empty";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		if(uname.length < 1) {
			error = true;
			errMsg = "Username cannot be empty";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		if(job.length < 1) {
			error = true;
			errMsg = "Job title cannot be empty";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		// Name/Username alphanumeric
		if(has_special_char(fname) || has_special_char(lname) || has_special_char(uname)) {
			error = true;
			errMsg = "Name/Username must be alphanumeric";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		// Passwords don't match
		if(pass1 != pass2) {
			error = true;
			errMsg = "Passwords don't match";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		// Password validation
		if(!password_check(pass1)) {
			error = true;
			errMsg = "Password must contain at least 1 special char. and be at least 8 chars. long";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		if(pay < 0) {
			error = true;
			errMsg = "Invalid wage/salary";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		let options = ["none", "hourly", "weekly", "biweekly", "semimonthly", "monthly", "semiannual", "annual"];

		if(jQuery.inArray(rate, options) == -1) {
			error = true;
			errMsg = "Invalid pay rate";
			alert.addClass("alert-danger");
			alert.html(errMsg);
			alert.removeClass("d-none");
			return;
		}

		if(error == false) {
			$.ajax({
				url: '/delectable/public_html/assets/scripts/restaurant-employee.php',
				type: 'POST',
				data: {
					'emp-first-name': fname,
					'emp-last-name': lname,
					'emp-email': email,
					'emp-username': uname,
					'emp-password-1': pass1,
					'emp-password-2': pass2,
					'emp-manager': access,
					'emp-job': job,
					'emp-pay': pay,
					'emp-pay-rate': rate,
					'loc_id': lid,
					'create-employee-account': true
				}
			}).done(function(res) {
				response = JSON.parse(res);
				resError = response.error;
				console.log(response);
				if(resError == false) {
					if(!$("#manager-list-alert").hasClass("d-none")) {
						$("#manager-list-alert").addClass("d-none");
					}
					if(!$("#employee-list-alert").hasClass("d-none")) {
						$("#employee-list-alert").addClass("d-none");
					}
					data = response.data;
					empId = data.emp_id;
					// Build row to append to employee/manager table
					let row = "<tr>";
					row += "<td>" + fname + " " + lname + "</td>";
					row += "<td>" + uname + "</td>";
					row += "<td><a href='./edit/index.php?eid=" + empId + "' class='text-link table-link'>Profile</a></td>";
					row += "<td><input type='checkbox' name='' disabled='true'></td>";
					if(access == 1) {
						row += "<td><button class='btn-link-alt border-0 text-link table-link emp-revoke-manager' value='" + empId + "'>Revoke</button></td>";
					} else {
						row += "<td><button class='btn-link-alt border-0 text-link table-link emp-add-manager' value='" + empId + "'>Grant</button></td>";
					}
					row += "</tr>";
					if(access == 0) {
						$("#employee-list tbody").append(row);
					} else {
						$("#manager-list tbody").append(row);
					}
					if(alert.hasClass("alert-danger")) {
						alert.removeClass("alert-danger");
					}
					alert.addClass("alert-success");
					alert.html("Employee account created");
					alert.removeClass("d-none");
					// Clear input fields
					for(let f of fields) {
						$(f).val("");
					}
				} else {
					resErrorMsg = response.error_msg;
					if(alert.hasClass("alert-success")) {
						alert.removeClass("alert-success");
					}
					alert.addClass("alert-danger");
					alert.html(resErrorMsg);
					alert.removeClass("d-none");
				}
			});
		}
	});
	// Create Employee END

	// Revoke manager access
	$("#manager-list").each(function() {
		$(this).on('click', '.emp-revoke-manager', function(e) {
			let eid = $(this).val();
			let button = $(this);
			let row = $(this).parent().parent();
			$.ajax({
				url: '/delectable/public_html/assets/scripts/restaurant-employee.php',
				type: 'POST',
				data: {
					'emp_id': eid,
					'loc_id': lid,
					'revoke_manager_access': true
				}
			}).done(function(res) {
				let success = JSON.parse(res);
				if(success) {
					if(!$("#manager-list-alert").hasClass("d-none")) {
						$("#manager-list-alert").addClass("d-none");
					}
					button.html("Grant");
					button.removeClass("emp-revoke-manager");
					button.addClass("emp-add-manager");
					$("#employee-list tbody").append(row);
					if($("#employee-list-alert").hasClass("alert-danger")) {
						"#employee-list-alert".removeClass("alert-danger");
					}
					$("#employee-list-alert").html("Employee updated");
					$("#employee-list-alert").addClass("alert-success");
					$("#employee-list-alert").removeClass("d-none");
				} else {
					if($("#employee-list-alert").hasClass("alert-success")) {
						$("#employee-list-alert").removeClass("alert-success");
					}
					$("#employee-list-alert").html("Error updating employee");
					$("#employee-list-alert").addClass("alert-danger");
					$("#employee-list-alert").removeClass("d-none");
				}
			});
		});
	});

		// Revoke manager access
	$("#employee-list").each(function() {
		$(this).on('click', '.emp-add-manager', function(e) {
			let eid = $(this).val();
			let button = $(this);
			let row = $(this).parent().parent();
			$.ajax({
				url: '/delectable/public_html/assets/scripts/restaurant-employee.php',
				type: 'POST',
				data: {
					'emp_id': eid,
					'loc_id': lid,
					'grant_manager_access': true
				}
			}).done(function(res) {
				let success = JSON.parse(res);
				if(success) {
					if(!$("#employee-list-alert").hasClass("d-none")) {
						$("#employee-list-alert").addClass("d-none");
					}
					button.html("Revoke");
					button.removeClass("emp-add-manager");
					button.addClass("emp-revoke-manager");
					$("#manager-list tbody").append(row);
					if($("#manager-list-alert").hasClass("alert-danger")) {
						"#manager-list-alert".removeClass("alert-danger");
					}
					$("#manager-list-alert").html("Employee updated");
					$("#manager-list-alert").addClass("alert-success");
					$("#manager-list-alert").removeClass("d-none");
				} else {
					if($("#manager-list-alert").hasClass("alert-success")) {
						$("#manager-list-alert").removeClass("alert-success");
					}
					$("#manager-list-alert").html("Error updating employee");
					$("#manager-list-alert").addClass("alert-danger");
					$("#manager-list-alert").removeClass("d-none");
				}
			});
		});
	});
});