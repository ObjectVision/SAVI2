gdal_translate -of VRT -ot Byte -scale D:\SourceData\StartAnalyse\V1\klimaat\GH\GH_2010.tif D:\SourceData\StartAnalyse\V1\klimaat\GH\GH_2010.vrt

gdal2tiles --zoom=5-18 --s_srs=EPSG:3857 D:\SourceData\StartAnalyse\V1\klimaat\GH\GH_2010.vrt C:\LocalData\startanalyse_2_0\klimaat\GH_2010