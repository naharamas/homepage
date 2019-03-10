<?php
	$url = isset($_GET[ 'url' ])? $_GET[ 'url' ] : null; 
	$result = file_get_contents( $url );

	header("Access-Control-Allow-Origin: *"); // Needed if you host the file separately from the startpage.
	header('Content-type:application/rss+xml;charset=utf-8');
	echo ( $result ) ;
?>