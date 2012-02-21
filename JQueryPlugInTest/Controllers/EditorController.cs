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
            return View();
        }

        [HttpPost]
        public JsonResult Index(TemplateData filedata)
        {
            filedata.elements.FirstOrDefault().height += 200;
            filedata.elements.FirstOrDefault().x += 30;
            filedata.elements.Skip(1).FirstOrDefault().width += 123;
            return Json(filedata);
        }

    }

    public class TemplateData
    {
        public List<PageElement> elements { get; set; }
    }

    public class PageElement
    {
        public string name { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int width { get; set; }
        public int height { get; set; }
    }
}
