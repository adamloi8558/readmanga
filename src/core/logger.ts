/**
 * Logger utility for development
 * In production, replace with proper logging service (e.g., Winston, Pino)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, data: unknown, message?: string) {
    // ไม่แสดง debug logs เลยใน browser (แสดงแค่ error และ warn)
    if (level === 'debug') return;
    
    // แสดงแค่ error และ warn ใน development
    if (level === 'info' && this.isDevelopment) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';

    if (message) {
      console[consoleMethod](prefix, message, data);
    } else {
      console[consoleMethod](prefix, data);
    }
  }

  debug(data: unknown, message?: string) {
    this.log('debug', data, message);
  }

  info(data: unknown, message?: string) {
    this.log('info', data, message);
  }

  warn(data: unknown, message?: string) {
    this.log('warn', data, message);
  }

  error(data: unknown, message?: string) {
    this.log('error', data, message);
  }
}

export const logger = new Logger();

