<?php
	header('Access-Control-Allow-Origin: *');
	require_once("../core/init.php");
	$resp = new stdClass();
	$resp->err = 0;
	$resp->msg = array();
	$resp->data = array();

	$postdata = @json_decode(file_get_contents("php://input"));
    foreach ($postdata as $key => $value) {
    	$_POST[$key] = $value;
    }

    if(Input::exist()) {
	    $validate = new Validate();
	    if($validate->check($_POST, array(
	        "id" => array(
	            "required" => true,
	            "numeric" => true
	        )
	    ))->passed()) {
	        $xSQL = "SELECT id, nombre FROM provincias";
	    	if(Input::get("id") > 0) {
	        	$xSQL .= " WHERE id = " . Input::get("id");
	    	}
	    	$xSQL .= " ORDER BY nombre";
	        $provincias = DB::getInstance()->query($xSQL);
			if(!$provincias->error()) {
				$resp->data = $provincias->results();
			} else {
				$resp->err = 1;
				$resp->msg[] = $provincias->errMsg();
			}
	    } else {
	    	$resp->err = 1;
	        foreach($validate->errors() as $value) {
	            $resp->msg[] = $value;
	        }
	    }
	} else {
		$resp->err = 1;
		$resp->msg[] = "Datos insuficientes";
	}
    echo(json_encode($resp));
?>