#include<stdio.h>
#include<semaphore.h>
#include<pthread.h>
#define MAX_TICKET 5

int available_tickets = MAX_TICKET;
sem_t ticket_lock;

void* book_ticket(void* arg){
    int user_id=*(int*)arg;
    sem_wait(&ticket_lock);
    if(available_tickets>0){
        printf("User id %d booked the ticket\n",user_id);
        available_tickets--;
    }
    sem_post(&ticket_lock);
    return NULL;
}

int main(){
    pthread_t user[10];
    int user_id[10];
    sem_init(&ticket_lock,0,1);
    for(int i=0;i<10;i++){
        user_id[i]=1001+i;
        pthread_create(&user[i],NULL,book_ticket,&user_id[i]);
    }
    for(int i=0;i<10;i++) pthread_join(user[i],NULL);
    sem_destroy(&ticket_lock);
    return 0;
}
