import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private mediaStream: MediaStream | null = null;
  private recognition: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  public isRecording: boolean = false;

  constructor(private http: HttpClient) {}

  startMeeting() {
    this.getMediaAccess()
      .then((stream) => {
        this.mediaStream = stream;
        console.log('Media access granted');
        this.startRecording(stream);
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
        alert('Unable to access camera or microphone. Please allow permissions.');
      });
  }

  stopMeeting() {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach(track => track.stop());
      console.log('Meeting stopped and media stream closed');
    }
    if (this.recognition) {
      this.recognition.stop();
      console.log('Speech recognition stopped');
    }
    this.isRecording = false;

    // Stop the MediaRecorder and create the video file
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      console.log('Recording stopped');
    }
  }

  private async getMediaAccess(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  }

  private startRecording(stream: MediaStream) {
    console.log('Recording started');
    
    // Initialize the MediaRecorder to record both audio and video
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      this.recordedChunks.push(event.data);
    };
    console.log('MediaRecorder initialized'); 

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);

      // Create FormData to send the audio/video as file to backend
      const formData = new FormData();
      formData.append('file', blob, 'meeting-recording.webm');
      formData.append('model', 'whisper-large-v3');  // Specify the model for transcription
      formData.append('response_format', 'json');   // Optional: response format

      // Send to backend API for GroqCloud transcription
      this.sendAudioToBackend(formData);
      
      // Provide a download link to the user
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = 'meeting-recording.webm';
      link.textContent = 'Click here to download the recording';
      document.body.appendChild(link); // Add link to DOM
    };

    console.log('MediaRecorder event listeners added');
    this.mediaRecorder.start();
    this.isRecording = true;

    // Start speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');

      console.log('Transcript:', transcript);
      this.sendConversationToBackend(transcript);
    };

    console.log('Speech recognition started');

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        alert('No speech detected. Please speak into the microphone.');
      } else if (event.error === 'network') {
        alert('Network error. Please check your internet connection.');
      } else {
        alert(`Error occurred: ${event.error}`);
      }
    };

    this.recognition.start();
    console.log('Speech recognition event listeners added');
  }

  private sendConversationToBackend(conversation: string) {
    const backendUrl = 'http://localhost:6600/api/meetings'; // Update with your backend URL

    const payload = {
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      conversation,
      attendees: [
        {
          name: 'Random User',
          email: 'randomuser@example.com',
        },
      ],
      additionalInfo: 'Transcribed meeting data.',
    };

    this.http.post(backendUrl, payload).subscribe({
      next: (response) => console.log('Meeting data sent successfully:', response),
      error: (error) => console.error('Error sending meeting data:', error),
    });
  }

  private sendAudioToBackend(formData: FormData) {
    const backendUrl = 'http://localhost:6600/api/audio-transcription'; // Backend route for audio processing

    this.http.post(backendUrl, formData).subscribe({
      next: (response) => {
        console.log('Audio data sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending audio data:', error);
      },
    });
  }
}
