ogr2ogr -f MVT ./test_tiles C:\LocalData\vesta50_vl_branch\panden_export\pand.gpkg -dsco MAX_SIZE=50000000 -dsco MAX_FEATURES=2000000 -dsco MINZOOM=12 -dsco MAXZOOM=18 -dsco COMPRESS=NO -dsco SIMPLIFICATION=0.0 -dsco SIMPLIFICATION_MAX_ZOOM=0.0 -dsco FORMAT=DIRECTORY -dsco CONF=C:/Users/Cicada/prj/SAVI2/data/pand.json