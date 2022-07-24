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



SELECT *
  FROM [dbo].[DATA_table]



INSERT INTO [dbo].[DATA_table]([Name],[Tag_1],[Tag_2],[Tag_3]) VALUES('Liza',365,90,215)
  
GO


select TagTimeStamp, Tag_1 from DATA_table where TagTimeStamp BETWEEN '2022-07-22 00:30:23.000' and '2022-07-23 04:30:23.000'
