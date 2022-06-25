USE [dbmusics]
GO

/****** Object:  Table [dbo].[Artists]    Script Date: 12/21/2019 1:37:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Artists](
	[ArtistID] [int] IDENTITY(1,1) NOT NULL,
	[ArtistName] [nvarchar](200) NOT NULL,
	[AlbumName] [nvarchar](200) NOT NULL,
	[ImageURL] [nvarchar](200) NULL,
	[ReleaseDate] [date] NOT NULL,
	[Price] [numeric](10, 2) NOT NULL,
	[SampleURL] [nvarchar](200) NULL,
 CONSTRAINT [PK_Artists] PRIMARY KEY CLUSTERED 
(
	[ArtistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


