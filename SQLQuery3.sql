USE [TEST_db]
GO

/****** Object:  Table [dbo].[DATA_table]    Script Date: 7/19/2022 22:18:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DATA_table](
	Nr int identity(1,1) primary key,
	[TagTimeStamp] [datetime] NOT NULL DEFAULT (getdate()) ,
	[Name] [char](30) NULL,
	[Tag_1] [float] NULL,
	[Tag_2] [smallint] NULL,
	[Tag_3] [smallint] NULL
) ON [PRIMARY]
GO



SELECT * FROM [dbo].[DATA_table]


INSERT INTO [dbo].[DATA_table]([Tag_1],[Tag_2],[Tag_3]) VALUES(+0.000000E+0,+0,+0)
INSERT INTO [dbo].[DATA_table]([Name],[Tag_1],[Tag_2],[Tag_3]) VALUES('Liza',365,90,215)
  
GO


select TagTimeStamp, Tag_1 from DATA_table where TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'


select TagTimeStamp, Tag_2 from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:00' and '2022-07-23 20:00:00'

select TagTimeStamp, Tag_3 from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-21 10:00:00' and '2022-07-23 10:00:00'



select TagTimeStamp, Tag_1 AS VASIA from DATA_table where TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'
select TagTimeStamp, Tag_3 AS Tag_1,Tag_2 AS Tag_2,Tag_1 AS Tag_3 from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'
select count(*) as COUNT_ROWS from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'

select TagTimeStamp, Tag_3 AS Tag_1,Tag_2 AS Tag_2,Tag_1 AS Tag_3 ,count(TagTimeStamp) as COUNT_ROWS
from DATA_table 
WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'
GROUP BY TagTimeStamp,Tag_1,Tag_2,Tag_3

SELECT (SELECT COUNT(*) from DATA_table WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000') AS Total,TagTimeStamp, Tag_3 AS Tag_1,Tag_2 AS Tag_2,Tag_1 AS Tag_3
FROM DATA_table
WHERE TagTimeStamp BETWEEN '2022-07-23 00:00:23.000' and '2022-07-23 04:30:23.000'