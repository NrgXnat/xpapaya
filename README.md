# xpapaya: Papaya DICOM viewer integration into XNAT

## Prerequisites

This plugin contains everything required for a basic integration of the Papaya DICOM viewer into XNAT.
This requires using XNAT version 1.7 or later, preferably the most recently released version available.
You can find the latest version on the [XNAT application download page](https://bintray.com/nrgxnat/applications/XNAT/_latestVersion)
or get the latest development version on the [XNAT build server](https://jenkins1.xnat.org/job/XNAT%20Web/lastSuccessfulBuild/).

To build the xpapaya plugin from source, you'll need git to clone the repository. If there is an
official release of the xpapaya plugin, you'll also be able to download the plugin directly from the 
[XNAT Marketplace](https://marketplace.xnat.org).

## Building the xpapaya plugin

To build the plugin from source:

1. Clone the source repository:

 ```bash
 $ git clone https://github.com/NrgXnat/xpapaya.git
 ```

1. Change to the source directory:

 ```bash
 $ cd xpapaya
 ```

1. The papaya source code is referenced in xpapaya as a submodule. This must be initialized explicitly:

 ```bash
 $ git submodule update --init --recursive
 $ cd papaya
 $ git pull origin master
 ```

 The last two commands are only necessary if you want to make sure you have the latest development code
 from the papaya project.

1. Build the plugin jar by running the **gradlew** or **gradlew.bat** script with the **jar** task:

 ```bash
 $ ./gradlew jar
 ```

 If you see the message "BUILD SUCCESSFUL", you've successfully built your xpapaya plugin jar, which can
 now be deployed as described in the following section. You can find the plugin in the folder **build/libs**.
 It will be named something like **xpapaya-plugin-_version_.jar**.

## Deploying the xpapaya plugin

Once you have your xpapaya plugin jar, you can deploy it by copying it into the folder named **plugins** 
under the XNAT home folder for your installed XNAT server, then restarting the Tomcat application server.
XNAT VMs that are build from the [XNAT Vagrant project](https://bitbucket.org/xnatdev/xnat-vagrant.git)
use the home folder **/data/_user_/home**, with the default value for _user_ set to "xnat". The commands
below use these default values to demonstrate how to deploy the plugin, but you can change them based on
your particular server configuration.

```bash
$ sudo service tomcat7 stop
$ rm /data/xnat/home/plugins/xpapaya-plugin-*.jar
$ cp xpapaya-plugin-0.2-SNAPSHOT.jar /data/xnat/home/plugins
$ sudo service tomcat7 start
```

Once Tomcat has restarted, you should be able to navigate to any image session in your XNAT deployment
and view individual scans in the Papaya viewer by clicking on the scans in the scan list for the session.
