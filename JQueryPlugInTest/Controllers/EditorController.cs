using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JQueryPlugInTest.Controllers
{
    public class EditorController : Controller
    {
        //
        // GET: /Editor/

        public ActionResult Index()
        {
            //Comment
            return View();
        }

        [HttpPost]
        public JsonResult Index(TemplateData filedata)
        {
            return Json(filedata);
        }

    }

    public class TemplateData
    {
		public List<PageElement> Elements { get; set; }
		public string Name { get; set; }
		public PageRepositionGap PageRepositionGap { get; set; }
		public PageSize PageSize { get; set; }
    }
	
	public class PageRepositionGap
	{
		public int top { get; set; }
		public int left { get; set; }
	}
	
	public class PageSize
	{
		public int width { get; set; }
		public int height { get; set; }
	}
	
    public class PageElement
    {
        public string Name { get; set; }
		public Properties Properties { get; set; }
    }

	public class Properties
	{
		public string Type { get; set; }
		public Position Position { get; set; }
		public Size Size { get; set; }
		public string Font { get; set; }
		public string FontColor { get; set; }
		public string FontSize { get; set; }
		public Border LeftBorder { get; set; }
		public Border RightBorder { get; set; }
		public Border TopBorder { get; set; }
		public Border BottomBorder { get; set; }
		public string LabelText { get; set; }
		public string DataText { get; set; }
	}
	
	public class Position
	{
		public int top { get; set; }
		public int left { get; set; }
	}
	
	public class Size
	{
		public int width { get; set; }
		public int height { get; set; }
	}
	
	public class Border
	{
		public bool Visible { get; set; }
		public string Color { get; set; }
	}
}
