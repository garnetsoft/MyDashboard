package com.avaldes.service;
 
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;

import org.hyperic.sigar.FileSystem;
import org.hyperic.sigar.SigarException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.avaldes.dao.DashboardRepository;
import com.avaldes.model.DiskStatistics;
import com.avaldes.model.Disks;
import com.avaldes.model.Heartbeat;
import com.avaldes.model.JvmStatistics;
import com.avaldes.model.NetworkInterfaceDetails;
import com.avaldes.model.NetworkInterfaceStats;
import com.avaldes.model.NetworkInterfaces;
import com.avaldes.model.OperatingSystemDetails;
import com.avaldes.model.Statistics;
import com.avaldes.util.JvmStatisticsUtility;
 
/**
 * Handles requests for the application home page.
 */
@Controller
public class RestController {
 
  private static final Logger logger = LoggerFactory.getLogger(RestController.class);
  public static final String APPLICATION_JSON = "application/json";
  public static final String APPLICATION_XML = "application/xml";
  public static final String APPLICATION_HTML = "text/html";
  private Heartbeat heartbeat = null;
  
  @Autowired 
  private DashboardRepository dashboardRepository; 

  public RestController() {
	  InetAddress ip;
	  
	  heartbeat = new Heartbeat();
	  try {
          ip = InetAddress.getLocalHost();
          heartbeat.setIpAddress(ip.getHostAddress());
          logger.info("Your current IP address : " + ip.getHostAddress());
      } catch (UnknownHostException e) {
          e.printStackTrace();
      }
	  
	  logger.info("Heartbeat = " + heartbeat);
  }
  
  /**
   * Simply selects the home view to render by returning its name.
 
   */
  @RequestMapping(value = "/status", method = RequestMethod.GET, produces=APPLICATION_HTML)
  public @ResponseBody String status() {
    return "Dashboard Backend Status OK...";
  }

  @RequestMapping(value="/statistics", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody Statistics getStatistics() {
    logger.info("Inside getStatistics() method...");
 
    Statistics stats = dashboardRepository.getStatisticsByID("1");
    return stats;
  }

  @RequestMapping(value="/cpu", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody JvmStatistics getJVMStatistics() {
	  JvmStatistics jvm = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	try {
   		jvm  = jvmstats.getJVMStatistics("State.Name.sw=java"); 
	} catch (SigarException e) {
		logger.error(e.getMessage()); 
	}
  	
  	return jvm;
  	
  }
  
  @RequestMapping(value="/osdetails", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody OperatingSystemDetails getOSDetails() {
	  OperatingSystemDetails osDetails = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	osDetails  = jvmstats.getOSDetails();
 	return osDetails; 	
  }
  
  @RequestMapping(value="/getallnetworkinterfaces", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody NetworkInterfaces getAllNetworkInterfaces(
		  @RequestParam(value="is_filtered", defaultValue="true") boolean isActive) {
	 NetworkInterfaces networkInterfaces = null;
	 
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
	networkInterfaces  = jvmstats.getAllNetInterfaces(isActive);

 	return networkInterfaces; 	
  }
  
  @RequestMapping(value="/getnetworkstats", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody NetworkInterfaceStats getNetworkInterfaceStats(@RequestParam("interface") String netInterface) {
	  NetworkInterfaceStats networkInterfaceStats = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	try {
		networkInterfaceStats  = jvmstats.getNetworkInterfaceStats(netInterface);
	} catch (SigarException e) {
		e.printStackTrace();
	}

 	return networkInterfaceStats; 	
  }
  
  @RequestMapping(value="/networkdetails", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody NetworkInterfaceDetails getNetworkDetails(@RequestParam("interface") String netInterface) {
	NetworkInterfaceDetails networkDetails = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	try {
		networkDetails  = jvmstats.getNetInterfaceDetails(netInterface);
	} catch (SigarException e) {
		e.printStackTrace();
	}
 	return networkDetails; 	
  }

  @RequestMapping(value="/getalldisks", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody Disks getGetAllDisks() {
	DiskStatistics diskDetails = null;
	FileSystem[] fsList = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	fsList  = jvmstats.getAllFileSystemList();
  	Disks allDisks = new Disks();
  	for (FileSystem fs: fsList) {
  		String drive = fs.getDirName();
  		double percent = 0;
  		boolean isOnline = false;
  		try {
  	  		diskDetails  = jvmstats.getDiskDetails(drive);
  	  		percent = diskDetails.getUsePercentage();
  	  		isOnline = true;
  		} catch (SigarException e) {
  			isOnline = false;
  		}
	  	allDisks.addDrive(fs.getDirName(), fs.getDevName(), fs.getTypeName(), fs.getSysTypeName(),
	  						fs.getOptions(), fs.getType(), fs.getFlags(), isOnline, percent*100.0);
  	}
  	
 	return allDisks; 	
  }
  
  @RequestMapping(value="/diskdetails", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody DiskStatistics getDiskDetails(@RequestParam("drive") String drive) {
	  DiskStatistics diskDetails = null;
	  
  	JvmStatisticsUtility jvmstats = JvmStatisticsUtility.getInstance();
  	try {
  		diskDetails  = jvmstats.getDiskDetails(drive);
	} catch (SigarException e) {
		e.printStackTrace();
	}
 	return diskDetails; 	
  }
  
  @RequestMapping(value="/heartbeat", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody Heartbeat genHeartbeartAndBroadcast() {
	  Date now = new Date();
	  heartbeat.setCount(heartbeat.getCount()+1);
	  heartbeat.setCurrentDate(now);
	  
	  return heartbeat;
  }
    
  @RequestMapping(value="/resetheartbeat", method=RequestMethod.GET, produces={APPLICATION_JSON,APPLICATION_XML})
  public @ResponseBody Heartbeat resetHeartbeatAndBroadcast() {
	  Date now = new Date();
	  heartbeat.setCount(1);			// Reset back to 1
	  heartbeat.setStartDate(now);
	  heartbeat.setCurrentDate(now);
	  
	  return heartbeat;
  } 
}