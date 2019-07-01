package com.axej.harlan.common.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;











import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;










import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.joda.time.DateTime;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import com.alibaba.fastjson.JSON;

public class JsonUtils {

	protected HttpServletResponse response;
	protected HttpServletRequest request;
	private static final String rdom="132";


	@ModelAttribute
	public void aaa(HttpServletResponse response){
		this.response = response;
	}

	@ModelAttribute
	public void bbb(HttpServletRequest request){
		this.request = request;
	}

	public void writeAlert(String msg){
		writeScript("alert('"+msg+"');");
	}

	public void writeScript(String msg){
		writeString("<script>"+msg+"</script>");
	}

	public void writeJson(Object object) {
		writeString(JSON.toJSONString(object));
	}

	public void writeString(String str) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(str);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String IDGenerate(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public synchronized  void download(String urlStr,String filename) throws IOException {
		// 构造URL
		URL url = new URL(urlStr);
		// 打开连接
		URLConnection con = url.openConnection();
		//设置请求超时为5s
		con.setConnectTimeout(5*1000);
		// 输入流
		InputStream is = con.getInputStream();

		// 1K的数据缓冲
		byte[] bs = new byte[1024];
		// 读取到的数据长度
		int len;

		// 将文件存到指定位置
		URL u = this.getClass().getResource("/");
		String c = this.getClass().getResource("/").getPath();
		c = java.net.URLDecoder.decode(c, "utf-8");
		String pp = c.substring(1, c.lastIndexOf("WEB-INF"));
		String aa=pp;
		System.out.println("aa"+aa);
		// 输出的文件流
		File sf=new File(aa);
		if(!sf.exists()){
			sf.mkdirs();
		}
		OutputStream os = new FileOutputStream(aa+filename);
		// 开始读取
		while ((len = is.read(bs)) != -1) {
			os.write(bs, 0, len);
		}
		// 完毕，关闭所有链接
		os.close();
		is.close();
	}


	public void SaveFileFormInputStream(InputStream steam,String path,String filename)throws Exception
	{
		File file=new File(path);
		if(!file.exists())
		{
			file.mkdirs();
		}
		FileOutputStream fs = new FileOutputStream(path+"/"+filename);
		byte[] buffer = new byte[1024*1024];
		int bytesum=0;
		int byteread=0;
		while((byteread=steam.read(buffer))!=-1){
			bytesum+=byteread;
			fs.write(buffer,0,byteread);
			fs.flush();
		}
		fs.close();
		steam.close();
	}


	//当前日期减一天
	public static String datePlus(String date) throws ParseException{

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dt = sdf.parse(date);
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(dt);

		rightNow.add(Calendar.DAY_OF_MONTH, -1);
		Date dt1 = rightNow.getTime();
		String reStr = sdf.format(dt1);
		return reStr;
	}

	//当前日期-还款日期
	public static long selectDate(String smdate){
		String bdate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
//			String smdate="2017-06-22";
//			String bdate1="2017-07-18";

		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		long time1 = 0;
		long time2 = 0;

		try{
			cal.setTime(sdf.parse(smdate));
			time1 = cal.getTimeInMillis();
			cal.setTime(sdf.parse(bdate));
			time2 = cal.getTimeInMillis();
		}catch(Exception e){
			e.printStackTrace();
		}
		long between_days=(time2-time1)/(1000*3600*24);
		return between_days;
	}




	public synchronized static String genItemId() {
		long millis = System.currentTimeMillis();
		String str = String.format("%02d", millis);
		return str;
	}
	public Map uploadPicture(MultipartFile uploadFile) {
		// TODO Auto-generated method stub
		Map map = new HashMap();
		URL u = this.getClass().getResource("/");
		System.out.println(u);
		String c = this.getClass().getResource("/").getPath();
		try {
			c = java.net.URLDecoder.decode(c, "utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String pp = c.substring(1, c.lastIndexOf("WEB-INF"));

		try {
			// 生成一个新的文件名称
			String oldName = uploadFile.getOriginalFilename();
			// 获取原始文件的文件名称
			String newName = genItemId();

			newName = newName + oldName.substring(oldName.lastIndexOf("."));

			String fileName = new DateTime().toString("yyyy/MM/dd/");

			String address = pp + fileName;

			this.SaveFileFormInputStream(
					uploadFile.getInputStream(), address, newName);

			map.put("error",0);
			//设置的url是配置好的http服务器 nginx
			map.put("url",fileName+newName);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			map.put("error",1);
			map.put("message","文件上传失败");
			return map;
		}
	}
}
