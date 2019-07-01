package com.axej.harlan.common.threadpool;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Description：线程池配置
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：9:18 2019/3/30
 */
@Configuration
@EnableAsync
public class ExecutorConfig {

    private static final Logger logger = LoggerFactory.getLogger(ExecutorConfig.class);

    @Value("${spring.threadpool.corePoolSize}")
    private String corePoolSize;

    @Value("${spring.threadpool.maxPoolSize}")
    private String maxPoolSize;

    @Value("${spring.threadpool.queueCapacity}")
    private String queueCapacity;

    @Value("${spring.threadpool.keepAliveSeconds}")
    private String keepAliveSeconds;

    @Value("${spring.threadpool.threadNamePrefix}")
    private String threadNamePrefix;

    @Bean
    public Executor asyncServiceExecutor() {
        logger.info("start asyncServiceExecutor");
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //配置核心线程数
        executor.setCorePoolSize(Integer.valueOf(corePoolSize));
        //配置最大线程数
        executor.setMaxPoolSize(Integer.valueOf(maxPoolSize));
        //配置队列大小、缓冲队列允许的线程数
        executor.setQueueCapacity(Integer.valueOf(queueCapacity));
        //允许的线程空闲时间
        executor.setKeepAliveSeconds(Integer.valueOf(keepAliveSeconds));
        //配置线程池中的线程的名称前缀
        /*executor.setThreadNamePrefix("async-service-");*/
        executor.setThreadNamePrefix(threadNamePrefix);

        // rejection-policy：当pool已经达到max size的时候，如何处理新任务
        // CALLER_RUNS：不在新线程中执行任务，而是有调用者所在的线程来执行
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        //执行初始化
        executor.initialize();
        return executor;
    }
}
